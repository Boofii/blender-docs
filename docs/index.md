# Blender Documentation

## Introduction
Welcome to Blender's Wiki! Blender is a modding API for Cuphead made to simplify the creation of mods.
Using it, adding things such as custom weapons, levels, and much more becomes a short and easy process.<br>
This wiki will be a guide for you to learn to use most of the features of Blender.<br>
Blender has a [discord server](https://discord.com/invite/py9mWsShcf) where you can discuss, or ask for help with your mod development journey.<br>

## Finding Cuphead install location
If you got Cuphead from Steam it should be in
`C:\Program Files (x86)\Steam\steamapps\common\Cuphead`.<br>If you got it from Gog it should be in `C:\GOG Games`<br>
::: info
The above is only applied if you didn't use a custom install location for Cuphead.
:::

## BepInEx
Blender mods use a mod loader called BepInEx. Unlike all the mods until now, BepInEx doesn't replace
the file `Assembly-CSharp.dll` which means that all of the Blender mods can exist together at the same time.
This means that you can create mod packs and share them to the world to change the game entirely.
You can install BepInEx [from here](https://github.com/BepInEx/BepInEx/releases)
And follow the instructions to install it for Cuphead [in here](https://docs.bepinex.dev/articles/user_guide/installation/index.html#installing-bepinex)

## Creating a Mod
1) Install .NET Sdk v7.0 if you don't have it already [from here](https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/sdk-7.0.410-windows-x64-installer)
2) Install Visual Studio Community 2022 if you don't have it already [from here](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Community&channel=Release&version=VS2022&source=VSLandingPage&passive=false&cid=2030)
2) Open Command Prompt in the directory you want your project to be located in and run the command:
```
dotnet new install BepInEx.Templates --nuget-source https://nuget.bepinex.dev/v3/index.json
```
3) To create the actual mod, use the following command but replace 'CupheadPlugin' with the name of your mod:
```
dotnet new bepinex5plugin -n CupheadPlugin -T net35 -U 2017.4.9 
```

## Logging
BepInEx comes with a logging system which helps you debug or test if your mod is working the way it should in real-time. 
After creating your mod, you will see a `Plugin.cs` class, this class is like the `Main` of your mod, this is where you link all
of your mod together. This class inherits from `BaseUnityPlugin`, which means that you can use all of Unity normal `MonoBehaviour`
functions, and `Awake` will be your main method.<br> Every `BaseUnityPlugin` instance comes with a `Logger`. You can use for example
```cs
private void Awake()
{
    Logger.LogInfo("Hello World!")
}
```
to log this message when your plugin initializes, this can be used to test if your mod loaded correctly.
::: tip
There are more logging methods, like `LogWarning`, `LogError`, or `LogDebug`, use one that suits the specific log message.
:::

## Adding Cuphead's code and Blender as a reference
1) To use Cuphead's code in your mod, you will have to add `Assembly-CSharp.dll` as a reference in your project.<br>
This file is found in `Cuphead's directory\Cuphead_Data\Managed`.<br>
2) You will also have to add `Blender.dll` taken [from here](https://github.com/Boofii/Blender/releases)
to use Blender functions.<br>
::: info
To add a reference you can follow the instructions [here](https://learn.microsoft.com/en-us/visualstudio/ide/how-to-add-or-remove-references-by-using-the-reference-manager?view=vs-2022#add-a-reference).
:::

## Testing the mod
To make your mod playable, you will have to turn your code into a dll file by building it.<br>
1) Inside of Visual Studio, press Ctrl+B. In file explorer, you should now see a dll for your mod in the path `bin\Debug\net35`.
2) Go to `Cuphead's directory\BepInEx\plugins`, create a directory there named after your mod, and put the dll in the new directory.
3) You can now run Cuphead and check if your mod was loaded by checking the `BepInEx\LogOutput.log` file.

## External Links
<a href="https://gamebanana.com/mods/532236">Gamebanana Page</a><br>
<a href="https://github.com/Boofii/Blender">Github Repository</a>