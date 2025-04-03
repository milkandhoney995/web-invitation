import type { Preview } from '@storybook/react'
import { ThemeProvider } from '@emotion/react'
// import GlobalStyes  from '@/styles/GlobalStyes'
import { Provider } from 'react-redux'

const preview: Preview = {
  // decorators: [
  //   (Story) => (
  //     <>
  //       <Provider>
  //         <ThemeProvider theme={theme}>
  //           <GlobalStyes />
  //           <Story />
  //         </ThemeProvider>
  //       </Provider>
  //     </>
  //   )
  // ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;