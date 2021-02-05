export const lightTheme = {
    colors: {
        background: '#FAFAFA',
        surface: '#fff',
        primary: '#e92390',
        secondary: '#b20063',
        error: '#B00020',
        onBackground: '#000',
        onSurface: '#000',
        onPrimary: '#fff',
        onSecondary: '#fff',
        onError: '#fff',
        slider: '#fff',
        border: '#b20063',
        secondaryBorder: '#b20063',
        shadow: 'gray',
        link: '#007bff',
        linkHover: '#0056b3',
    },
    switcher: {
        iconOffest: '28px',
        iconUrl: `${process.env.PUBLIC_URL}/img/sun.svg`
    }
}

export const darkTheme = {
    colors: {
        background: '#424242',
        surface: '#424242',
        primary: '#212121',
        secondary: '#F48FB1',
        error: '#F48FB1',
        onBackground: '#fff',
        onSurface: '#fff',
        onPrimary: '#fff',
        onSecondary: '#000',
        onError: '#fff',
        slider: '#01579B',
        border: '#F48FB1',
        secondaryBorder: '#424242',
        shadow: 'lightgray',
        link: '#b3e5fc',
        linkHover: '#e1f5fe',
    },
    switcher: {
        iconOffest: '6px',
        iconUrl: `${process.env.PUBLIC_URL}/img/moon.svg`
    }
}