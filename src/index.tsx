import { memo } from "react"

import {
  DevtoolProvider,
  RHFDevToolPanel,
  RHFDevToolPanelContainer,
  RHFDevToolPanelContent,
  RHFDevToolPanelTitle,
  RHFDevToolPanelToggleButton,
  type RHFDevToolProps,
  RHFFieldStateList,
  RHFPanelMeta,
  RHFValuesSnapshot,
} from "./components/devtools"

const RHFDevTool = memo(function RHFDevTool({
  defaultOpen = false,
  title = "Form Debug",
  control,
  showValues,
}: RHFDevToolProps) {
  return (
    <DevtoolProvider control={control} defaultOpen={defaultOpen}>
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
