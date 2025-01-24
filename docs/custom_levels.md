# Custom Levels

## Introduction & Setup
::: info
This is a more advanced tutorial, and requires a bit of unity editor knowledge.<br>
It is recommended to watch a short tutorial series on youtube before proceeding, unless you know the basics.
:::
::: warning IMPORTANT
When working with level objects, it is important to set the main camera's size to 360.
When setting it, you will notice that your sprites are barely visible, so set their `Pixels Per Unit` value in their import settings to a low value like 1.
:::
When making custom levels, you will have to add a lot of components to the level environment, enemies, etc.<br>
It is recommended to download the [unity modding template](https://drive.google.com/file/d/1gERIJdGg7x5gvWvJpsNUzsniijEc-J2x/view) which will provide you with all of cuphead's scripts built directly into it, and save many unnecessary lines of code.
1) Open the template project, in the project's `Assets` you will see a scene called `scene_level_template`, copy and paste it.
2) Choose your level id, it must start with `scene_level_` and must be unique.
3) Name the level template clone exactly as your level id.
4) Go ahead and add whatever you want to the level. Be creative!

## Adding the boss
I'm not going to go over creating a boss in detail, and you'll be pretty much on your own in this.<br>
But it's basically just a level object that has an `Enemy` tag and it should be in the `Enemies` layer.<br>
You can add a sprite renderer to it, a few animations, a rigid body and some collider maybe, and also a few important components like:<br>
::: details DamageReceiver
The component that allows the boss to be damaged.<br><br>
**Fields:**
1) **Type:**<br>The type of it, default: Enemy.
2) **Animators Effected By Pause:**<br>A list of all the animator components related to the enemy. default: Empty List.
:::
::: details HitFlash
The component that makes the boss change color when getting hit.<br><br>
**Fields:**
1) **Damage Color:**<br>The color it changes to when getting hit, default: Black.
2) **Damage Reciever:**<br>The damage reciever linked to the boss. default: None, has to be set.
:::
::: details AnimationHelper
The component that stops the boss's animations when the game is paused and other things related to animations.
:::
## Registering the level to the game
Once your level is set up in unity, you can put the new scene in a new asset bundle and put it in your mod's `Assets` directory.<br>
After that, you can go into your mod's `Initializer` class and put the following code in there:<br>
```cs
string bundlePath = "Blender:my_level_bundle";
string levelName = "MyLevelName";

Scenes myNewScene = SceneRegistries.Levels.Register("scene_level_id",
    new LevelInfo(typeof(MyLevelType), bundlePath, levelName)
        .SetActualType(Level.Type.Battle)
        .SetPlayerMode(PlayerMode.Level)
        .SetDefaultGoalTimes(new Level.GoalTimes(1F, 1.25F, 1.5F))
        .SetSetupAction((level) => {
            // You can use this event to tweak the level just before it is enabled.
        }));
```
In the following code, nothing is required and everything has default values except of the `LevelInfo` arguments themselves, nothing can be null there.<br>
The things below are optional and are self-explanatory. Just make sure to change `scene_level_id`, `levelName`, `bundlePath` and `MyLevelType`.<br><br>

Additionally to registering the level, you'll also have to create a level type.<br>
```cs
public class MyLevelType : Level
{
    public override Levels CurrentLevel => (Levels)Enum.Parse(typeof(Levels), "MyLevelName");
    public override Scenes CurrentScene => (Scenes)Enum.Parse(typeof(Scenes), "scene_level_id");
    public override Sprite BossPortrait => throw new System.NotImplementedException();
    public override string BossQuote => throw new System.NotImplementedException();

    public override void OnLevelStart()
    {
        base.OnLevelStart();
    }

    public override void OnLevelEnd()
    {
        base.OnLevelEnd();
    }
}
```
In the following code, you'll have to change `MyLevelType`, to a name you choose for the type, `MyLevelName` and `scene_level_id`.<br>
From now on you'll be on your own and it's all a matter of reverse engineering the game and understanding how levels are made in cuphead. You will get it after a while.<br>

## Entering the level in-game
```cs
Levels level = SceneRegistries.GetLevel((Scenes)Enum.Parse(typeof(Scenes), "scene_level_id"));
SceneLoader.LoadLevel(level, SceneLoader.Transition.Fade);
```
You can use the following code at any point in the game to enter the level. Blender will automatically populate the level with a player, an audio manager and other important level resources.