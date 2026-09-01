import React, { createContext, useContext, useState, useEffect } from "react";
import { portfolioData as defaultData } from "../data/portfolioData";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

const PortfolioContext = createContext({
  data: defaultData,
  loading: false,
  isConfigured: false,
  user: null,
  isAuthenticated: false,
  saveData: async () => {},
  uploadAsset: async () => {},
  refreshData: async () => {},
  logout: async () => {},
});

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
        setIsAuthenticated(Boolean(session?.user));
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  // Fetch live portfolio data from Supabase
  const fetchSupabaseData = async () => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { data: row, error } = await supabase
          .from("portfolio_content")
          .select("content")
          .eq("id", "main_config")
          .maybeSingle();

        if (row && row.content) {
          const content = { ...row.content };
          if (content.personal?.email === "brahamjot2004@gmail.com" || !content.personal?.email) {
            content.personal = { ...content.personal, email: "admin@brahamjot.dev" };
          }
          setData(content);
          localStorage.setItem("portfolio_custom_data", JSON.stringify(content));
          return;
        }
      }

      // Local storage cache fallback
      const cached = localStorage.getItem("portfolio_custom_data");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed.personal?.email === "brahamjot2004@gmail.com" || !parsed.personal?.email) {
            parsed.personal = { ...parsed.personal, email: "admin@brahamjot.dev" };
          }
          setData(parsed);
        } catch (e) {
          // ignore parsing error
        }
      }
    } catch (err) {
      console.warn("Portfolio data fetch fallback to local defaults:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupabaseData();
  }, []);

  // Save updated data to Supabase and local cache
  const saveData = async (newData) => {
    setData(newData);
    localStorage.setItem("portfolio_custom_data", JSON.stringify(newData));

    let remoteSaved = false;

    // 1. Try Supabase save
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from("portfolio_content")
          .upsert({
            id: "main_config",
            content: newData,
            updated_at: new Date().toISOString(),
          });

        if (!error) {
          remoteSaved = true;
        } else {
          console.error("Supabase upsert error:", error);
        }
      } catch (err) {
        console.error("Supabase save exception:", err);
      }
    }

    // 2. Also notify local API route for disk persistence
    try {
      await fetch("/api/portfolio-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: "2004", data: newData }),
      });
    } catch (err) {
      // ignore
    }

    return remoteSaved;
  };

  // Upload file asset to Supabase Storage
  const uploadAsset = async (file, folder = "resumes") => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error("Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local");
    }

    const fileExt = file.name.split(".").pop();
    const cleanFileName = `${folder}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    const { data: uploadResult, error: uploadError } = await supabase.storage
      .from("portfolio_assets")
      .upload(cleanFileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: urlData } = supabase.storage
      .from("portfolio_assets")
      .getPublicUrl(cleanFileName);

    return urlData.publicUrl;
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        loading,
        isConfigured: isSupabaseConfigured,
        user,
        isAuthenticated,
        saveData,
        uploadAsset,
        refreshData: fetchSupabaseData,
        logout,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioContext);
  if (!context) {
    return {
      data: defaultData,
      loading: false,
      isConfigured: false,
      user: null,
      isAuthenticated: false,
      saveData: async () => {},
      uploadAsset: async () => {},
      refreshData: async () => {},
      logout: async () => {},
    };
  }
  return context;
}
