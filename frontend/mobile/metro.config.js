const { getDefaultConfig } = require("expo/metro-config")
const path = require("path")

const projectRoot = __dirname
const sharedRoot = path.resolve(projectRoot, "../shared")

const config = getDefaultConfig(projectRoot)

// Add shared folder to watchFolders
config.watchFolders = [sharedRoot]

// Add shared folder to resolver.extraNodeModules
config.resolver.extraNodeModules = {
    "@shared": sharedRoot,
}

// Add shared folder to resolver.nodeModulesPaths
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(sharedRoot, "node_modules"),
]

module.exports = config
