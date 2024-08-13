# Custom Weapons

## Creating the weapon in Unity
::: info
This is a more advanced tutorial, and requires a bit of unity editor knowledge.<br>
It is recommended to watch a short tutorial series on youtube before proceeding, unless you already know the basics.
:::
::: warning IMPORTANT
When working with level objects, it is important to set the main camera's size to 360.
When setting it, you will notice that your sprites are barely visible, so set their `Pixels Per Unit` value in their import settings to a low value like 1.
:::
Like in the charms tutorial, we will choose an id for the custom weapon.
This id must start with `level_weapon_` and must be unique.<br>
Weapons are built from four objects, You are responsible for which of them you add:<br>
1. Basic projectile
2. EX projectile
3. Basic Firing Effect
4. EX Firing Effect<br>
1) Create a game object named after the weapon id you chose. Add to it a number of empty game objects depending on the number of elements you chose.
2) Add to all of the weapon childs a `SpriteRenderer` component and an `Animator` component.
3) If you chose to add any firing effects, create a non-looping animation for them.
4) Add a collider to your projectile based on their sprite size. Also, set the `Is Trigger` value in the collider settings to `True`.
5) projectile must contain 2 animations. A looping moving animation and a non-looping death animation.
Cuphead uses the death animation to destroy the projectile when it hits something, so you must add one or the projectile won't be destroyed.<br>
The name of the moving animation doesn't matter, but the death animation must contain `death` in its name, so Blender can detect it as a death animation.
6) In the animator for all of your projectiles, create a trigger called `OnDeath` and a transition from the moving animation to the death animation.
Make the transition activate with the new trigger.
7) Drag the weapon object to `Assets` and put the new prefab in a new asset bundle that will contain all of the future weapons for your mod.
8) Generate the new bundle and put it in your mod's `Assets` directory.

## Adding the weapon
Registering weapons is done using the `EquipRegistries.Weapons.Register` method.<br>
Here is a base example for registering a weapon:
```cs
string atlasPath = "Blender:weapon_icons\\atlas";
string bundlePath = "Blender:weapons";
string weaponId = "level_weapon_exploder";
Weapon exploder = EquipRegistries.Weapons.Register(weaponId,
    new WeaponInfo(typeof(TheWeaponType), bundlePath)
        .SetAtlasPath(atlasPath)
        .SetNormalIcons(["exploder0", "exploder1", "exploder2"])
        .SetGreyIcons(["exploder_grey0", "exploder_grey1", "exploder_grey2"])
        .AsWeaponInfo());
```
Here, `bundlePath` is the path to the bundle that contains all of your mod's weapons.<br>
`weaponId` is a unique id for your weapon that must be exactly the same as the one you had in unity.<br>
`TheWeaponType` is the type that will contain the behaviour for your custom weapon.
::: tip
When registering the weapon, before calling `SetAtlasPath`, you can use other methods as well to customize your weapon further. For example:<br>
```cs
.SetBasicType() //Allows to add a custom basic projectile behaviour. Default: BasicProjectile
.SetExType() //Allows to add a custom ex projectile behaviour. Default: BasicProjectile
.SetBasicEffectType() //Allows to add a custom basic effect type. Default: WeaponSparkEffect
.SetBasicEffectType() //Allows to add a custom ex effect type. Default: WeaponSparkEffect
```
:::

## Adding custom behaviour
Create a new class that inherits from `AbstractLevelWeapon`. Here is an example for a basic one:
```cs
public class YourWeaponType : AbstractLevelWeapon
{
    public override bool rapidFire => true; //If the weapon is spammable.
    public override float rapidFireRate => 0.16F; //The spam rate for the weapon.

    public override AbstractProjectile fireBasic() //Called when firing the basic projectile
    {
        BasicProjectile projectile = base.fireBasic() as BasicProjectile;
        projectile.Speed = 1125F;
        projectile.Damage = 4F;
        projectile.PlayerId = player.id;
        projectile.DamagesType.PlayerProjectileDefault();
        projectile.CollisionDeath.PlayerProjectileDefault();
        return projectile;
    }

    public override AbstractProjectile fireEx() //Called when firing the basic projectile
    {
        BasicProjectile projectile = base.fireEx() as BasicProjectile;
        projectile.Speed = 2250F;
        projectile.Damage = 25F;
        projectile.PlayerId = player.id;
        projectile.DamagesType.PlayerProjectileDefault();
        projectile.CollisionDeath.PlayerProjectileDefault();
        MeterScoreTracker meterScoreTracker = new(MeterScoreTracker.Type.Ex);
        meterScoreTracker.Add(projectile);
        return projectile;
    }
}
```