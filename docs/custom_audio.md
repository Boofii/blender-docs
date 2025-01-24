# Custom Audio

## Creating the audio clips
::: info
This section assumes that you have a unity project set up and you know how to create asset bundles.
If not, follow [this tutorial](/asset_bundles).<br>
:::
::: tip
In Cuphead, sound effects and BGM are `wav` files, so make sure your files are `wav` too.
:::
1) Import your audio files to unity, and put them all in an asset bundle.
2) Press Ctrl+G to generate the asset bundle and put it in your mod's `Assets` directory.

## Adding the audio
```cs
string bgmBundle = "Blender:bgm";
string sfxBundle = "Blender:sfx";
AudioPatcher.AddPersistentBGM(bgmBundle);
AudioPatcher.AddPersistentSounds(sfxBundle);
AudioPatcher.AddBGM("scene_map_world_1", bgmBundle);
AudioPatcher.AddSounds("scene_map_world_1", sfxBundle);
```
1) In the following code, the `Persistent` methods load the sounds at the start of the game and they will stay all time.<br>
2) The normal methods load the sounds only in specific scenes, which is useful in some cases and saves memory if you don't need them all time.<br>
3) Choose whatever that is suitable for your use cases, put it in your mod's `Initializer` and change the bundle paths. Blender will load the sounds depending on the load conditions
and will inject them automatically to Cuphead's `AudioManager` system.

## Playing the audio
As long as your audio is loaded at the point you want to play, you can just use the `AudioManager` class to do multiple things with your audio:<br>
```cs
string audioId = "my_clip"; // The name of the clip as put into the asset bundle.
AudioManager.Play(audioId); // Plays the audio once.
AudioManager.PlayLoop(audioId); // Starts a loop of that audio.
AudioManager.Stop(audioId); // Stops a loop of that audio.
```