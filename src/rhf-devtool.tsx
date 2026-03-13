import { memo } from "react"

import type { FieldValues, UseFormReturn } from "react-hook-form"

import {
  DevtoolProvider,
  RHFDevToolPanel,
  RHFDevToolPanelContainer,
  RHFDevToolPanelContent,
  RHFDevToolPanelTitle,
  RHFDevToolPanelToggleButton,
  RHFFieldStateList,
  RHFPanelMeta,
} from "./components/devtools"

const RHFDevTool = memo(function RHFDevTool({
  defaultOpen = false,
  title = "Form Debug",
  methods,
}: {
  defaultOpen?: boolean
  title?: string
  methods?: UseFormReturn<FieldValues>
}) {
  return (
    <DevtoolProvider methods={methods} defaultOpen={defaultOpen}>
      <RHFDevToolPanelContainer>
        <RHFDevToolPanelToggleButton />
        <RHFDevToolPanel>
          <RHFDevToolPanelTitle>{title}</RHFDevToolPanelTitle>
          <RHFDevToolPanelContent>
            <RHFFieldStateList />
            <RHFPanelMeta />
          </RHFDevToolPanelContent>
        </RHFDevToolPanel>
      </RHFDevToolPanelContainer>
    </DevtoolProvider>
  )
})

export { RHFDevTool as DevTool }
