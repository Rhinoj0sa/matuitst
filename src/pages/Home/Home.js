import Page from 'material-ui-shell/lib/containers/Page'
import React from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useIntl } from 'react-intl'
import Employees from '../Employees/Employees'
const HomePage = () => {
  const intl = useIntl()

  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })}>
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        {intl.formatMessage({ id: 'home' })}
        <Employees />
      </Scrollbar>
    </Page>
  )
}
export default HomePage
