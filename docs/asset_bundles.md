# Asset Bundles

## Introduction
Asset Bundles are files that contain unity assets like sprites, audio and more.<br>
Custom charms, weapons, levels, and most of Blender's features use them in a way.<br>
Creating them requires installing [Unity v2017.3.0](https://unity.com/releases/editor/whats-new/2017.3.0).

## Set up the project
::: info
This is a one time process, you won't have to do it again.
:::
1) In the unity hub, create a new 2D project and open it.
2) Create `Scripts\Editor` directories inside of your project's `Assets`.
4) Inside of the `Editor` directory, create a script called `BundleGen` that will contain the following code:<br>
```cs
using UnityEngine;
using UnityEditor;
using System.IO;

public class BundleGen
{
    [MenuItem("Assets/Generate Bundles %G")]
    private static void GenerateBundles()
    {
        string dirPath = "Assets/StreamingAssets";
        if (!Directory.Exists(Application.streamingAssetsPath))
            Directory.CreateDirectory(dirPath);
        BuildPipeline.BuildAssetBundles(dirPath, BuildAssetBundleOptions.None, BuildTarget.StandaloneWindows64);
    }
}
```

## Creating the assets
1) Bring your asset to `Assets` if it isn't there already. Click on the asset to view it in the inspector:
![An image](/images/asset_bundle.png)
2) In the bottom of the inspector, click on the `AssetBundle` dropdown and click on `New` to name your new bundle.
3) You can add all of the assets you want to the new bundle, and then use the shortcut `Ctrl+G` to generate your bundles.
4) Go to your project in file explorer and go to the `Assets\StreamingAssets` directory, you can now grab the generated asset bundle.
5) Go to the directory where your mod is installed and create a new `Assets` directory in there, put the asset bundle there.