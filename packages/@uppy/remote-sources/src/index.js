import { BasePlugin } from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import Dropbox from '@uppy/dropbox'
import GoogleDrive from '@uppy/google-drive'
import Instagram from '@uppy/instagram'
import Facebook from '@uppy/facebook'
import OneDrive from '@uppy/onedrive'
import Box from '@uppy/box'
import Unsplash from '@uppy/unsplash'
import Url from '@uppy/url'
import Zoom from '@uppy/zoom'

const availablePlugins = [
  Box,
  Dropbox,
  Facebook,
  GoogleDrive,
  Instagram,
  OneDrive,
  Unsplash,
  Url,
  Zoom,
]

export default class RemoteSources extends BasePlugin {
  constructor (uppy, opts) {
    super(uppy, opts)
    this.id = this.opts.id || 'RemoteSources'
    this.type = 'acquirer'

    this.defaultOptions = {
      sources: [
        'Box',
        'Dropbox',
        'Facebook',
        'GoogleDrive',
        'Instagram',
        'OneDrive',
        'Unsplash',
        'Url',
      ],
      target: Dashboard,
    }
    this.opts = { ...this.defaultOptions, ...opts }
  }

  setOptions (newOpts) {
    this.uninstall()
    super.setOptions(newOpts)
    this.install()
  }

  install () {
    this.opts.sources.forEach((pluginName) => {
      const optsForRemoteSourcePlugin = { ...this.opts }
      delete optsForRemoteSourcePlugin.sources
      const plugin = availablePlugins.filter(p => p.name === pluginName)[0]
      this.uppy.use(plugin, optsForRemoteSourcePlugin)
    })
  }

  uninstall () {
    this.opts.sources.forEach((pluginName) => {
      const plugin = this.uppy.getPlugin(pluginName)
      this.uppy.removePlugin(plugin)
    })
  }
}
