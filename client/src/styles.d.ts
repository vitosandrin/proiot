import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      types: {
        dragon: string;
        ghost: string;
        ice: string;
        water: string;
      };
      background: string;
      light: {
        pure: string;
        1: string;
        2: string;
        3: string;
        4: string;
      };
      dark: {
        pure: string;
        1: string;
        2: string;
        3: string;
        4: string;
      };
      neutral: {
        pure: string;
        1: string;
        2: string;
        3: string;
      };
      feedback: {
        warning: string;
        error: string;
        success: string;
        successhover: string;
        info: string;
      };
    };
    font: {
      colors: {
        steel: string;
        white: string;
        dark: string;
        1: string;
        2: string;
        3: string;
      };
    };
    breakpoints: {
      xsm: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    transitions: {
      time: string;
      type: string;
    };
    spacing: {
      xxxs: string;
      xxs: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
  }
}
