import { Platform } from 'react-native';

const tintColorLight = '#4CAF50';
const tintColorDark = '#4CAF50';

export const Colors = {
    text: '#ECEDEE', /*main text*/
    background: '#151718', /*main background*/
    tint: tintColorDark, /*links and buttons*/
    icon: '#597165B2', /*secondary text and icons*/
    tabIconDefault: '#9BA1A6', /*unselected tab icon*/
    tabIconSelected: tintColorDark, /*selected tab icon*/ 
    primary: '#28AF6E', /*used in buttons A*/          
    secondary: '#8BC34A', /*used in highlights*/ 
    accent: '#FFC107', /*used in alerts*/ 
    surface: '#2C2C2C', /*cards and modals*/
    card: '#1E1E1E', /*tab bar background*/
    border: '#404040', /*separators and borders A*/
    premium: '#8D6E63', /*premium features*/
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
