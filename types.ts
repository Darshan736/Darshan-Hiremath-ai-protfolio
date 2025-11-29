
export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface TerminalMessage {
  text: string;
  type: 'user' | 'response' | 'system' | 'error';
}
