import { SPFetchClient } from "@pnp/nodejs";
import { sp } from "@pnp/sp/presets/all";

export const configSP = async () => {
  sp.setup({
      sp: {
          fetchClientFactory: () => {
              return new SPFetchClient("https://devfvg.sharepoint.com/sites/HeiderPrueba", "8902fdcc-af5e-4a99-aed0-02ec280da47d", "Axaers0vCGma4s06tHpCmYj08+orup6Ik+NkrDNtefE=");
          },
      },
  });
}