import React from "react";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
  AiOutlineGlobal,
  AiOutlineLink
} from "react-icons/ai";
import {
  FaLinkedinIn,
  FaDiscord,
  FaTelegramPlane,
  FaMediumM,
  FaTwitter,
  FaYoutube
} from "react-icons/fa";
import { SiLeetcode, SiCodechef, SiHashnode } from "react-icons/si";

export const PRESET_PLATFORMS = [
  { key: "github", label: "GitHub", icon: "github", placeholder: "https://github.com/..." },
  { key: "linkedin", label: "LinkedIn", icon: "linkedin", placeholder: "https://linkedin.com/in/..." },
  { key: "instagram", label: "Instagram", icon: "instagram", placeholder: "https://instagram.com/..." },
  { key: "twitter", label: "X / Twitter", icon: "twitter", placeholder: "https://x.com/..." },
  { key: "youtube", label: "YouTube", icon: "youtube", placeholder: "https://youtube.com/@..." },
  { key: "leetcode", label: "LeetCode", icon: "leetcode", placeholder: "https://leetcode.com/u/..." },
  { key: "discord", label: "Discord", icon: "discord", placeholder: "https://discord.gg/..." },
  { key: "telegram", label: "Telegram", icon: "telegram", placeholder: "https://t.me/..." },
  { key: "hashnode", label: "Hashnode", icon: "hashnode", placeholder: "https://hashnode.com/@..." },
  { key: "medium", label: "Medium", icon: "medium", placeholder: "https://medium.com/@..." },
  { key: "website", label: "Personal Website", icon: "website", placeholder: "https://..." }
];

export function getSocialIcon(platform) {
  const p = (platform || "").toLowerCase();
  if (p.includes("github")) return <AiFillGithub />;
  if (p.includes("linkedin")) return <FaLinkedinIn />;
  if (p.includes("instagram")) return <AiFillInstagram />;
  if (p.includes("twitter") || p === "x") return <FaTwitter />;
  if (p.includes("youtube")) return <FaYoutube />;
  if (p.includes("leetcode")) return <SiLeetcode />;
  if (p.includes("codechef")) return <SiCodechef />;
  if (p.includes("discord")) return <FaDiscord />;
  if (p.includes("telegram")) return <FaTelegramPlane />;
  if (p.includes("hashnode")) return <SiHashnode />;
  if (p.includes("medium")) return <FaMediumM />;
  if (p.includes("website") || p.includes("globe")) return <AiOutlineGlobal />;
  return <AiOutlineLink />;
}
