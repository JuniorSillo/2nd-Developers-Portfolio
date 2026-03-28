import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const socials = [
  {
    icon: FaGithub,
    path: "https://github.com/JuniorSillo",
    label: "GitHub",
  },
  {
    icon: FaLinkedin,
    path: "https://www.linkedin.com/in/moeketsi-junior-sillo-726073244/",
    label: "LinkedIn",
  },
  {
    icon: FaTwitter,
    path: "https://twitter.com/",
    label: "Twitter",
  },
];

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className={iconStyles}
        >
          <item.icon />
        </Link>
      ))}
    </div>
  );
};

export default Social;