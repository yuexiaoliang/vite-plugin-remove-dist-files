import fs from 'node:fs'
import path from 'node:path'

export default (files) => {
  let dist

  function removeFile(file) {
    const p = path.resolve(dist, file)

    if (fs.existsSync(p)) {
      fs.rmSync(p)
    }
  }

  return {
    name: 'vite-plugin-remove-dist-files',

    configResolved(config) {
      dist = path.resolve(config.root, config.build.outDir)
    },

    writeBundle() {
      if (typeof files === 'string') {
        removeFile(files)
      }

      else if (Array.isArray(files)) {
        files.forEach(removeFile)
      }

      else {
        console.warn('[remove-dist-files] files must be a string or an array')
      }
    }
  }
}
