import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "../"
import { dividerComponentStyles as styles } from "./divider-component.styles"

export interface DividerComponentProps {

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function Divider(props: DividerComponentProps) {
  // grab the props
  const { style, ...rest } = props

  return (
    <View style={{...styles.WRAPPER, ...style}} {...rest}></View>
  )
}
