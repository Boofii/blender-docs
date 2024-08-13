# Custom Supers

## Creating the super in Unity
::: info
This is a more advanced tutorial, and requires a bit of unity editor knowledge.<br>
It is recommended to watch a short tutorial series on youtube before proceeding, unless you already know the basics.
:::
::: warning IMPORTANT
When working with level objects, it is important to set the main camera's size to 360.
When setting it, you will notice that your sprites are barely visible, so set their `Pixels Per Unit` value in their import settings to a low value like 1.
:::
Like in the charms tutorial, we will choose an id for the custom super.
This id must start with `level_super_` and must be unique.<br>
Supers are built from two required objects in the following order:<br>
1. A cuphead animation
2. A mugman animation<br>
1) Create a game object named after the super id you chose. Add to it two game objects with a `SpriteRenderer` component and an `Animator` component.
2) Create an animation for Cuphead and an animation for Mugman.
6) Drag the super object to `Assets` and put the new prefab in a new asset bundle that will contain all of the future supers for your mod.
7) Generate the new bundle and put it in your mod's `Assets` directory.

## Adding the super
Registering supers is done using the `EquipRegistries.Supers.Register` method.<br>
Here is a base example for registering a super:
```cs
string atlasPath = "Blender:super_icons\\atlas";
string bundlePath = "Blender:supers";
string superId = "level_super_explosion";
Super explosion = EquipRegistries.Supers.Register(superId,
    new SuperInfo(typeof(TheSuperType), bundlePath)
        .SetAtlasPath(atlasPath)
        .SetNormalIcons(["explosion0", "explosion1", "explosion2"])
        .AsSuperInfo());
```
Here, `bundlePath` is the path to the bundle that contains all of your mod's supers.<br>
`superId` is a unique id for your super that must be exactly the same as the one you had in unity.<br>
`TheSuperType` is the type that will contain the behaviour for your custom super.
::: tip
If you want your super to be used for Chalice, you can call the following for the `SuperInfo`:
```cs
.SetChaliceSuper();
```
:::

## Adding Custom Behaviour
Create a new class that inherits from `AbstractPlayerSuper`. Here is an example for a basic one:
```cs
public class TheSuperType : AbstractPlayerSuper
{
    public override void StartSuper()
    {
        base.StartSuper();
        AudioManager.Play("player_super_ghost");
        StartCoroutine(DoSuper());
    }

    private IEnumerator DoSuper()
    {
        yield return new WaitForSeconds(1F);
        Fire();
        //Execute super
        yield return new WaitForSeconds(1F);
        Destroy(this.gameObject);
    }
}
```