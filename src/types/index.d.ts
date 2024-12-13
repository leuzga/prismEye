export interface Feature {
  button: button;
  image: string;
  bulletpoints: string[];
  content: string;
  title: string;
};

export interface Button {
  enable?: boolean;
  label: string;
  link: string;
};
