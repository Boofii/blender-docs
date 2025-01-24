# Persistent Data

Persistent Data means saving your own data in Cuphead's save file so you can get custom data from the last time you played Cuphead.<br>
For example, Cuphead saves the bosses you've killed, the weapon you are equipping and much more.<br>
In Blender you will use the `CustomData` class to interact with the custom data.

# How to use the class
```cs
int slot = 0;
string key = "custom_value";
object value = CustomData.Get(slot, key);
value ??= 0;
int intValue = (int) value;
if (intValue < 10)
    CustomData.Set(slot, key, intValue + 1);
else
    CustomData.Remove(slot, key);
```
1) In the following example, we get the value of `custom_value`. If it doesn't exist yet, we assign to it a value of 0.<br>
2) After that we get the value as an int and check if it's less than 10, if it is we increment it by 1.<br>
3) If it's bigger or equal to 10 we remove it which means that the next time the game runs it will start all over again.<br>

To get the current slot the player is in you can use:
```cs
int slot = PlayerData.CurrentSaveFileIndex;
```
To save the game after modifying something you can use:
```cs
PlayerData.SaveCurrentFile();
```