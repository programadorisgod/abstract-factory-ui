import { Constants } from "../constants/constants";
import { UIAndrodiProvider } from "../provider/ui-provider-android-factory";
import { UIAppleProvider } from "../provider/ui-provider-apple-factory";
import { UIFactoryProvider } from "../provider/ui-provider-factory";
import { UIWindowsProvider } from "../provider/ui-provider-windows-factory";

export class Platform {
  public  static isAppleMobileDevice() {
    return Constants.APPLEDEVICE.test(Constants.PLATFORM);
  }

  public static isAndroid() {
    return Constants.ANDROID.test(Constants.PLATFORM);
  }

  public static detectDevice(): UIFactoryProvider {
    if (this.isAppleMobileDevice()) {
      return new UIAppleProvider();
    }

    if (this.isAndroid()) {
      return new UIAndrodiProvider();
    }

    return new UIWindowsProvider();
  }
}
