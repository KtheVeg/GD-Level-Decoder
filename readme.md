# GD Save Decoder

Based on GDColon's [Save Decoder](https://github.com/GDColon/GD-Save-Decoder). This app will decode save files for you to manually edit, then repackage it up for Geometry dash.

# Usage Guide

Open Command Prompt or Powershell at the location of the app (You can hold `Shift` and right click in the folder to open powershell here).

## Quick guide

If you don't want to do anything complicated, you can use this quick guide to decode and encode save files (in command prompt, remove the `.\` from the beginning of the command)

To decode save files (options, account, progress, etc.)
```powershell
.\decoder.exe d s
```
To decode custom levels
```powershell
.\decoder.exe d l
```

To encode save files
```powershell
.\decoder.exe e s
```
To encode custom levels
```powershell
.\decoder.exe e l
```

You can also use the handy decode and encode batch files. They will decode and encode both save files and custom levels.

## Options
If you plan to automate this process, you can use the options to specify the input and output files and levels of verbosity.
```
[.\]decoder.exe <operation> [target] [options]
```

`<operation>` - The operation to perform
- `d` (or `decode`) - Decodes the save file
- `e` (or `encode`) - Encodes the save file

`[target]` - The target type of file. Required if input file is not specified.
- `s` (or `save`) - The target is a save file
- `l` (or `level`) - The target is a level file

Options: 

- `-p` (or `--path`) - The path to the save file. Required if target is not specified.
- `-d` (or `--decoded`) - The path to the decoded file. Defaults to `output.xml`.
    - If the target is specified, it will default to `CCGameManager.xml` or `CCLocalLevels.xml` depending on the target.  
- `-v` (or `--verbose`) - Shows more information about the process.