# Game Hooks

## Introduction
Game Hooks allow you to modify the game's code without replacing any files.<br>
They are done using a patched `Assembly-CSharp` that contains events for each method in the game.
You can get this patched file [from here](https://github.com/Boofii/Blender/blob/main/MMHOOK_Assembly-CSharp.dll).<br>
Once installed, you can put it in the `BepInEx\core` directory and reference it in your project.

## Creating the hook
To add a new hook you use `On.Type.Method` in your mod's `Awake` method. For example:
```cs
private void Awake()
{
    On.LevelPlayerMotor.DashComplete += OnDash;
}

private void OnDash(On.LevelPlayerMotor.orig_DashComplete orig, LevelPlayerMotor self)
{
    orig(self);
    //Executed after the player dashes.
}
```
Here, `self` is the instance of the class you hooked into, and `orig` is a delegate for the original method.
::: info
The hook replaces the method completely, that's why we call `orig(self);` to call the original method.
You may execute your own code before or after calling `orig`, depending on your needs.
:::