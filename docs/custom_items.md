# Custom Shop Items

## Creating the item in Unity
::: info
This is a more advanced tutorial, and requires a bit of unity editor knowledge.<br>
It is recommended to watch a short tutorial series on youtube before proceeding, unless you know the basics.
:::
::: warning IMPORTANT
When working with level objects, it is important to set the main camera's size to 360.
When setting it, you will notice that your sprites are barely visible, so set their `Pixels Per Unit` value in their import settings to a low value like 1.
:::
Shop items are built from four required objects in the following order:<br>
1. An "inactive" sprite
2. A "selected" animation
3. A "Purchased" sprite
4. A "shadow" sprite<br>
1) Create a game object named after the charm/weapon id you chose. Add to it four game objects.
2) For the inactive game object, add a sprite renderer with a single sprite. This object will be shown when the item is not selected.
3) For the selected game object, add a sprite renderer and one looping animation.  This object will be shown when the item is selected.
4) For the purchased game object, just add an empty sprite renderer.
5) For the shadow game object, add a sprite renderer with a single shadow sprite.
6) Drag the item object to `Assets` and put the new prefab in a new asset bundle that will contain all of the future items for your mod.
7) Generate the new bundle and put it in your mod's `Assets` directory.
::: tip
You can either create your own shadow sprite or use one from the [shadow pack]().
:::

## Adding the item
Adding an item is really easy, just go to the part in your code where you register the charm or weapon, and call the `SetShopInfo` method:
```cs
string bundlePath = "Blender:items";
string charmId = "charm_shield";
EquipRegistries.Charms.Register("charm_shield", new EquipInfo()
    .SetAtlasPath(atlasPath)
    .SetNormalIcons(["shield0", "shield1", "shield2"])
    .SetCost(5)
    .SetShopInfo(new ShopInfo(bundlePath)
        .SetCharm(charmId)));
```
Here, `bundlePath` is the path to the bundle that contains all of your mod's items.<br>
`charmId` is the id of the charm your item will unlock.<br>
::: info
```SetShopInfo``` is supported for registering weapons too, which means that you can call it the same way.
If you want the item to unlock something different, you can just call `SetItemType` and `SetWeapon(weaponId)` or `SetSuper(superId)`.
:::
::: tip
Shop info provides one method to customize the item further:<br>
```cs
.SetOriginalShadowScale(new UnityEngine.Vector3(2F, 2F, 1F)); //Set the original shadow scale of the item to be double the size.
```
:::