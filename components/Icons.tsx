
import React from 'react';

type IconProps = {
    className?: string;
};

export const GithubIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10,0,0,0,2,12c0,4.42,2.87,8.17,6.84,9.5.5.09.68-.22.68-.48s0-.85,0-1.67c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6,1,.07,1.53,1.03,1.53,1.03.89,1.53,2.34,1.09,2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95,0-1.1.39-1.99,1.03-2.69-.1-.25-.45-1.27.1-2.65,0,0,.84-.27,2.75,1.02.79-.22,1.65-.33,2.5-.33s1.71.11,2.5.33c1.91-1.29,2.75-1.02,2.75-1.02.55,1.38.2,2.4.1,2.65.64.7,1.03,1.59,1.03,2.69,0,3.85-2.34,4.7-4.57,4.94.36.31.68.92.68,1.85,0,1.34,0,2.42,0,2.75s.18.57.69.48A10,10,0,0,0,22,12,10,10,0,0,0,12,2Z"></path></svg>
);

export const LinkedinIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19,3A2,2,0,0,1,21,5V19A2,2,0,0,1,19,21H5A2,2,0,0,1,3,19V5A2,2,0,0,1,5,3H19M18.5,18.5V13.2A3.26,3.26,0,0,0,15.24,9.94C14.39,9.94,13.4,10.46,13,11.1V10.28H10.13V18.5H13V13.57C13,12.8,13.09,12.04,14.2,12.04C15.3,12.04,15.39,12.93,15.39,13.57V18.5H18.5M6.88,8.56A1.68,1.68,0,0,0,8.56,6.88C8.56,6,7.81,5.2,6.88,5.2A1.69,1.69,0,0,0,5.2,6.88C5.2,7.81,6,8.56,6.88,8.56M8.27,18.5V10.28H5.5V18.5H8.27Z"></path></svg>
);

export const MailIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
);

export const RobotIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A2 2 0 0 1 14 4v2a2 2 0 0 1-4 0V4a2 2 0 0 1 2-2m-3 5h6v3h-1v5a3 3 0 0 1-3 3 3 3 0 0 1-3-3v-5H9V7m-4 2h2v2H5v-2m14 0h-2v2h2v-2Z"></path></svg>
);

export const CpuIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20H8v-2H6v2H4v-2H2v-2h2v-2H2V8h2V6H2V4h2v2h2V4h2v2h2V4h2v2h2V4h2v2h2V4h2v2h2v8h-2v2h2v2h-2v2h-2v-2h-2v2h-2v-2h-2v2m4-4h-4v-4h4v4Z"></path></svg>
);

export const RocketIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="m13.11 5.59-1.8 1.8 1.09 1.09-2.2 2.2-3.1-3.1-4.1 4.1 2.39 2.39-2.8 2.8-1.5-1.5-.7.7 1.5 1.5-1.5 1.5.7.7 1.5-1.5 1.5 1.5.7-.7-1.5-1.5 2.8-2.8 2.39 2.39 4.1-4.1-3.1-3.1 2.2-2.2 1.09 1.09 1.8-1.8-.7-.7m5.29 2.81-1.4-1.4 2.5-2.5.7.7-1.8 1.8 1.4 1.4-1.4 1.4Z"></path></svg>
);

export const UploadIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"></path></svg>
);

export const PlayIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>
);

export const PauseIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>
);

export const SendIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
);
