import { Constants } from "../constants/constants";
import { BaseButton } from "../domain/prototype/base-button";
import { prototypeRegistry } from "../domain/prototype/prototype-registry";
import { UIAndrodiProvider } from "../provider/ui-provider-android-factory";
import { UIAppleProvider } from "../provider/ui-provider-apple-factory";
import { UIFactoryProvider } from "../provider/ui-provider-factory";
import { UIWindowsProvider } from "../provider/ui-provider-windows-factory";

export class Platform {
  public static isAppleMobileDevice() {
    return Constants.APPLEDEVICE.test(Constants.PLATFORM);
  }

  public static isAndroid() {
    return Constants.ANDROID.test(Constants.PLATFORM);
  }

  public static detectDevice(): UIFactoryProvider {
    if (this.isAppleMobileDevice()) {
      prototypeRegistry.register(
        "apple_button",
        new BaseButton("apple_button", "Pagar")
      );
      return new UIAppleProvider();
    }

    if (this.isAndroid()) {
      prototypeRegistry.register(
        "android_button",
        new BaseButton("android_button", "Pagar")
      );
      return new UIAndrodiProvider();
    }

    prototypeRegistry.register(
      "windows_button",
      new BaseButton("windows_button", "Pagar")
    );
    return new UIWindowsProvider();
  }
}
