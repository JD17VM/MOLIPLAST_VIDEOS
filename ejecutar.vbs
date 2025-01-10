Set WShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
strPath = fso.GetParentFolderName(WScript.ScriptFullName)

' Cambiar al directorio correcto
WShell.CurrentDirectory = strPath

' Abrir el navegador
WShell.Run "explorer http://localhost:5173", 0, False

' Ejecutar npm start de forma oculta
WShell.Run "cmd /c npm start", 0, False