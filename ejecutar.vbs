Set WShell = CreateObject("WScript.Shell")
strPath = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
WShell.CurrentDirectory = strPath
WShell.Run "cmd /c start /min runner.bat", 0, False