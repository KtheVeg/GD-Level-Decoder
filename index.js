const lvlDecode = require("./decode.js");
const lvlEncode = require("./encode.js");
const fs = require("fs");
var args;
var command;
var operationParams =
{
    "encodedFilePath": "",
    "decodedFilePath": "",
    "encode": false
};

// Parse command-line arguments
try {
    args = process.argv;
    if (args == undefined || args == null || args.length <= 3) {console.log("Visit https://github.com/KtheVeg/GD-Level-Decoder for more information."); process.exit(0);} // If the program is run without any arguments, print the help message and exit.
    args = args.slice(2);
    command = args[0];
    if (!command) {
        throw("No command specified! (e)");
        return;
    } else {
        switch (command)
        {
            case "decode":
            case "d":
                operationParams.encode = false;
                break;
            case "encode":
            case "e":
                operationParams.encode = true;
                break;
            default:
                throw("Invalid command specified! (e)");
        }
    }
    var target = "";
    var enableTargetCaution = false;
    if (!args[1].startsWith("-")) target = args[1]; else enableTargetCaution = true; // If the second argument is not a switch, it is the target. Otherwise, we need to check if the target is specified in the switches, which will be done later if the caution is enabled.
    if (!enableTargetCaution)
    switch (target)
    {
        case "save":
        case "s":
            operationParams.encodedFilePath = process.env["LOCALAPPDATA"] + "/GeometryDash/CCGameManager.dat";
            operationParams.decodedFilePath = __dirname + "/CCGameManager.xml";
            break;
        case "level":
        case "l":
            operationParams.encodedFilePath = process.env["LOCALAPPDATA"] + "/GeometryDash/CCLocalLevels.dat";
            operationParams.decodedFilePath = __dirname + "/CCLocalLevels.xml";
            break;
        default:
            throw("Invalid target specified! (e)");
    }

    // Parse switches
    for (var i = 1; i < args.length; i++)
    {
        var arg = args[i];
        if (arg.startsWith("-"))
        {
            switch (arg)
            {
                case "-p":
                case "--path":
                    operationParams.encodedFilePath = args[i + 1];
                    i++;
                    break;
                case "-d":
                case "--decoded":
                    operationParams.decodedFilePath = args[i + 1];
                    break;
                case "-v":
                case "--verbose":
                    operationParams.verbose = true;
                    console.log("Verbose mode enabled.");
                    break;
                default:
                    throw(`Invalid switch "${arg}" specified (e)`);
            }
        }
    }

    // Finally check if the target is specified in the switches
    if (enableTargetCaution)
    {
        if (operationParams.encodedFilePath == undefined || operationParams.encodedFilePath == null || operationParams.encodedFilePath == "") throw("No output path specified! Use the -p switch to specify the path, or use a target instead of a switch.");
    }
} catch (e) {
    console.error(`An error occurred while parsing command-line arguments: ${e}`);
    if (e.endsWith("(e)")) console.error("Visit https://github.com/KtheVeg/GD-Level-Decoder for more information."); else console.error("This seems to be an internal error. Please report this to the developer. Note down the internal error and the command arguments you used (Internal Error Code: 1)");

    process.exit(1);
}

// Perform the operation
if (operationParams.encode)
{
    console.log("Encoding...");
    try {lvlEncode(operationParams.decodedFilePath, operationParams.encodedFilePath);}
    catch (e) {
        console.error(`An error occurred while parsing command-line arguments: ${e}`);
    if (e.endsWith("(e)")) console.error("Visit https://github.com/KtheVeg/GD-Level-Decoder for more information."); else console.error("This seems to be an internal error. Please submit an issue at https://github.com/KtheVeg/GD-Level-Decoder/issues. Note down the internal error and the command arguments you used (Internal Error Code: 2)");
    }
} else {
    console.log("Decoding...");
    lvlDecode(operationParams.encodedFilePath, operationParams.decodedFilePath);
}