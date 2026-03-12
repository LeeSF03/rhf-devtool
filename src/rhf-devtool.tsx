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
  RHFValuesSnapshot,
} from "./components/devtools"

const RHFDevTool = memo(function RHFDevTool({
  defaultOpen = false,
  title = "Form Debug",
  showValues,
  methods,
}: {
  defaultOpen?: boolean
  title?: string
  showValues?: boolean
  methods?: UseFormReturn<FieldValues>
}) {
  return (
    <DevtoolProvider methods={methods} defaultOpen={defaultOpen}>
      <RHFDevToolPanelContainer>
        <RHFDevToolPanelToggleButton />
        <RHFDevToolPanel>
          <RHFDevToolPanelTitle>{title}</RHFDevToolPanelTitle>
          <RHFDevToolPanelContent>
            {showValues ? <RHFValuesSnapshot /> : null}
            <RHFFieldStateList />
            <RHFPanelMeta />
          </RHFDevToolPanelContent>
        </RHFDevToolPanel>
      </RHFDevToolPanelContainer>
    </DevtoolProvider>
  )
})

export { RHFDevTool as DevTool }
