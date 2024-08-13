# Custom Charms

## Creating the icons
::: info
This section assumes that you have a unity project set up and you know how to create asset bundles.
If not, follow [this tutorial](/asset_bundles).<br>
Custom Charms don't require icons, but it means that they will be blank in the equip menu.<br>
:::
::: tip
In Cuphead, icons are 80x80 pixels, and included in a 3 frame animation that switches every 0.07 seconds.
:::
1) Import your icons to Unity, and add them to a sprite atlas by following [this tutorial](https://docs.unity3d.com/2017.4/Documentation/Manual/SpriteAtlasWorkflow.html).
2) Put the sprite atlas in an asset bundle and press Ctrl+G to generate it.
3) Take the generated bundle and put it in your mod's `Assets` directory.

## Adding the charm
Registering charms is done using the `EquipRegistries.Charms.Register` method.<br>
Here is a base example for registering a charm:
```cs
string atlasPath = "Blender:charm_icons\\atlas";
string charmId = "charm_shield";
Charm shield = EquipRegistries.Charms.Register(charmId, new EquipInfo()
    .SetAtlasPath(atlasPath)
    .SetNormalIcons(["shield0", "shield1", "shield2"]));
```
Here, `atlasPath` is the `ModName:BundleName\\asset_name`.<br>
`charmId` is the id your charm will be registered with, it must be unique.<br>
`asset_name` is the name of your atlas as created in Unity. And can be null if you don't want any icons, you also don't have to call `SetNormalIcons` if you don't have any.<br>
Lastly, `SetNormalIcons` takes an array of the sprite names as imported to Unity.
::: info
Blender doesn't add new charm slots in the equip menu, it adds new pages to it.<br>
If the player has unlocked the charm, by calling `PlayerData.Data.Gift` or by purchasing it in the shop,
They can go downwards in the equip menu to reach the next page.
:::

## Making it useful
To check if the player has the charm equipped, you can use<br>
```cs
if (PlayerData.Data.Loadouts.GetPlayerLoadout(player_id).charm == CHARM_INSTANCE)
{
    //Execute your code.
}
```
This can be called whenever you want in [specific game events](/game_hooks) to add functionality to your charm.<br>
`CHARM_INSTANCE` is returned by the `Register` method.