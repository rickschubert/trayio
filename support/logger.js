import bunyan from 'bunyan'
import bformat from 'bunyan-format'
const formatOut = bformat({outputMode: 'short'})

module.exports = bunyan.createLogger({
    name: 'trayio-e2e',
    stream: formatOut,
})
