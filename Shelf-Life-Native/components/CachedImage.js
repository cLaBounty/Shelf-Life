// Taken from: https://www.echowaves.com/post/implementing-fast-image-for-react-native-expo-apps

import React, { useEffect, useState, useRef } from 'react'

import { Image } from 'react-native'

import * as FileSystem from 'expo-file-system'

import PropTypes from 'prop-types'


const IMAGE_CACHE_FOLDER = `${FileSystem.cacheDirectory}images/`

const CachedImage = props => {
  const { source: { uri }, cacheKey } = props

  const filesystemURI = `${IMAGE_CACHE_FOLDER}${cacheKey}`

  const [imgURI, setImgURI] = useState(filesystemURI)

  const componentIsMounted = useRef(true)

  useEffect(() => {
    const loadImage = async ({ fileURI }) => {
      try {
        // Use the cached image if it exists
        const metadata = await FileSystem.getInfoAsync(fileURI)
        if (!metadata.exists) {
          // download to cache
          if (componentIsMounted.current) {
            setImgURI(null)
            await FileSystem.downloadAsync(
              uri,
              fileURI
            )
          }
          if (componentIsMounted.current) {
            setImgURI(fileURI)
          }
        }
      } catch (err) {
        console.log() // eslint-disable-line no-console
        setImgURI(uri)
      }
    }

    loadImage({ fileURI: filesystemURI })

    return () => {
      componentIsMounted.current = false
    }
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Image
    // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      source={{
        uri: imgURI,
      }}
    />
  )
}

CachedImage.propTypes = {
  source: PropTypes.object.isRequired,
  cacheKey: PropTypes.string.isRequired,
}

export default React.memo(CachedImage)