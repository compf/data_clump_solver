import { ClientCapabilities } from "ts-lsp-client";

export const MyCapabilities: ClientCapabilities = {
    /**
     * Workspace specific client capabilities.
     */
    textDocument: {
        references: {
            dynamicRegistration: true
        },


    },
    window:
    {
        workDoneProgress: false,
        showDocument: {
            support: true
        },
        showMessage: {
            messageActionItem: { additionalPropertiesSupport: false }

        },

    }
}