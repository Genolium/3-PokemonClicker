import type { ThemeConfig } from 'antd';

export const pokemonTheme: ThemeConfig = {
    token: {
        colorPrimary: '#365FAC',
        colorInfo: '#365FAC',
        colorBgBase: '#FFFFFF',
        colorTextBase: '#000000',
        colorError: '#FF4D4F',

        fontFamily: '"Inter", sans-serif',
        fontSize: 14,

        borderRadius: 0,
        wireframe: false,
    },
    components: {
        Collapse: {
            headerPadding: '16px 24px',
            contentPadding: '0 24px 24px 24px',
            colorBorder: 'transparent',
            headerBg: '#ffffff',
            contentBg: '#ffffff',
            borderRadiusLG: 16,
        }
    }
};