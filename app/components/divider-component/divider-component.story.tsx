import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { DividerComponent } from "./divider-component"

declare var module

storiesOf("DividerComponent", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <DividerComponent text="DividerComponent" />
      </UseCase>
    </Story>
  ))
