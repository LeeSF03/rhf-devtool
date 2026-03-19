import { memo } from "react"

import type { Control } from "react-hook-form"

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
  control,
}: {
  defaultOpen?: boolean
  title?: string
  control?: Control | undefined
}) {
  return (
    <DevtoolProvider control={control} defaultOpen={defaultOpen}>
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
