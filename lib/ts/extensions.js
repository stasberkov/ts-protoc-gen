"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Printer_1 = require("../Printer");
var descriptor_pb_1 = require("google-protobuf/google/protobuf/descriptor_pb");
var util_1 = require("../util");
var FieldTypes_1 = require("./FieldTypes");
function printExtension(fileName, exportMap, extension, indentLevel) {
    var printer = new Printer_1.Printer(indentLevel + 1);
    printer.printEmptyLn();
    var extensionName = extension.getName() || util_1.throwError("Missing extension name");
    var extensionType = extension.getType() || util_1.throwError("Missing extension type");
    var extensionTypeName = extension.getTypeName() || null;
    var camelExtensionName = util_1.snakeToCamel(extensionName);
    var fieldType = FieldTypes_1.getFieldType(extensionType, extensionTypeName ? extensionTypeName.slice(1) : null, fileName, exportMap);
    if (extension.getLabel() === descriptor_pb_1.FieldDescriptorProto.Label.LABEL_REPEATED) {
        printer.printLn("export const " + camelExtensionName + "List: jspb.ExtensionFieldInfo<Array<" + fieldType + ">>;");
    }
    else {
        printer.printLn("export const " + camelExtensionName + ": jspb.ExtensionFieldInfo<" + fieldType + ">;");
    }
    return printer.output;
}
exports.printExtension = printExtension;
//# sourceMappingURL=extensions.js.map