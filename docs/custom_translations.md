# Custom Translations

## Creating the file
Localization files are JSON files, that are built from an array of objects.<br>
Each JSON object contains 3 fields:<br>

| Name          |  Description  |
| ------------- | :-----------: |
| key           | The key of the translation, must be unique. Required. |
| category      |   The category of the translation, must be in the `Localization.Categories` enum. Default: `NoCategory`     |
| translations  |   A dictionary of the translations for each language. Required.    |

An example localization file can look like this:
```json
[
    {
        "key": "custom_text",
        "translations": {
            "English": {
                "text": "hello"
            },
            "SpanishSpain": {
                "text": "hola"
            }
        }
    }
]
```

## Registering the file
Registering the localization file is done by using the `LocalizationPatcher.RegisterLocalization` method in your mod's `Awake` method:
```cs
LocalizationPatcher.RegisterLocalization(new Identifier("ModName", "Path\\To\\File.json"));
```

## Unique translations
Sometimes when adding custom content such as charms, Cuphead looks for certain keys.
For a charm's name for example, it will be `charm_id_name`.<br>
For a charm's subtext and description it will be `charm_id_subtext` and `charm_id_description`.
::: info
For weapon keys it will be the same but with the `weapon_id` instead.
:::