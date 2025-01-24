# Custom Assets

::: info
This section assumes that you have a unity project set up and you know how to create asset bundles.
If not, follow [this tutorial](/asset_bundles).<br>
:::

## Introduction & Setup
Assets are any game object that is loaded via an asset bundle. You can put in there almost anything.<br>
Blender automatically loads assets if you use them for weapons, charms, etc. But it doesn't take care of everything,
If you reach a point where you have to load an asset on your own that will be visible in the game in some way, the following tutorial is for you:
1) Like we do for everything, create a game object in unity, whatever you want to load to the game.
2) Put all of your custom assets in an asset bundle dedicated to them.
3) Press Ctrl+G to generate the bundle and put the generated file that is located in `StreamingAssets` in your mod's `Assets` directory.

## Loading it to the game
In your mod's `Initializer`, put the following code:<br>
```cs
string assetPath = "Blender:asset_bundle\\asset_name";
string bundlePath = "Blender:bundle2";

AssetHelper.AddPersistentPath(AssetHelper.LoaderType.Single, assetPath);
AssetHelper.AddScenePathMapping(AssetHelper.LoaderType.Multiple, "scene_map_world_1",
    [
        bundlePath
    ]);
```
1) In the following code, `AddPersistentPath` loads an asset at the start of the game, and makes sure it will be loaded throught all the game session.<br>
2) `AddScenePathMapping` loads an asset only in the specified scene, in this example, the first island, and unloads it when the scene switches.<br>
3) It is recommended to use `AddScenePathMapping` if your asset doesn't have to be loaded all the time, since it saves memory.<br><br>
4) There are two loader types: `Single` and `Multiple`:<br>
`Single` loads a specific asset from an asset bundle.<br>
`Multiple` loads all assets from an asset bundle.

## Using the asset
There are two ways to use the assets:<br>

### Load Actions
You can do something the moment an asset is loaded by using the following code:
```cs
SingleLoader.LoadActions[assetPath] += delegate (string name, UnityEngine.Object asset)
{
    // Do whatever you want with the asset here.
};
```
Or if you want to do it for a `MultiLoader`:
```cs
MultiLoader.LoadActions[bundlePath] += delegate (string name, UnityEngine.Object[] assets)
{
    // Do whatever you want with the assets here.
};
```

### Normal Use
If you don't want to do something with an asset the moment it is loaded, and you just need to get the loaded asset at any point:<br>
```cs
UnityEngine.Object singleAsset = SingleLoader.Instance.loadedAssets[assetPath].asset;
UnityEngine.Object[] multipleAssets = MultiLoader.Instance.loadedAssets[bundlePath].asset;
```