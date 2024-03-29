# Microsoft Developer Studio Project File - Name="demo2" - Package Owner=<4>
# Microsoft Developer Studio Generated Build File, Format Version 6.00
# ** DO NOT EDIT **

# TARGTYPE "Win32 (x86) Application" 0x0101

CFG=demo2 - Win32 Debug
!MESSAGE This is not a valid makefile. To build this project using NMAKE,
!MESSAGE use the Export Makefile command and run
!MESSAGE 
!MESSAGE NMAKE /f "demo2.mak".
!MESSAGE 
!MESSAGE You can specify a configuration when running NMAKE
!MESSAGE by defining the macro CFG on the command line. For example:
!MESSAGE 
!MESSAGE NMAKE /f "demo2.mak" CFG="demo2 - Win32 Debug"
!MESSAGE 
!MESSAGE Possible choices for configuration are:
!MESSAGE 
!MESSAGE "demo2 - Win32 Release" (based on "Win32 (x86) Application")
!MESSAGE "demo2 - Win32 Debug" (based on "Win32 (x86) Application")
!MESSAGE 

# Begin Project
# PROP AllowPerConfigDependencies 0
# PROP Scc_ProjName ""
# PROP Scc_LocalPath ""
CPP=cl.exe
MTL=midl.exe
RSC=rc.exe

!IF  "$(CFG)" == "demo2 - Win32 Release"

# PROP BASE Use_MFC 0
# PROP BASE Use_Debug_Libraries 0
# PROP BASE Output_Dir "Release"
# PROP BASE Intermediate_Dir "Release"
# PROP BASE Target_Dir ""
# PROP Use_MFC 0
# PROP Use_Debug_Libraries 0
# PROP Output_Dir "Release"
# PROP Intermediate_Dir "Release"
# PROP Ignore_Export_Lib 0
# PROP Target_Dir ""
# ADD BASE CPP /nologo /W3 /GX /O2 /D "WIN32" /D "NDEBUG" /D "_WINDOWS" /D "_MBCS" /YX /FD /c
# ADD CPP /nologo /G6 /Gr /W3 /GX /Zi /O2 /Ob2 /I "..\gamesystem\includes" /D "WIN32" /D "NDEBUG" /D "_WINDOWS" /D "_MBCS" /YX /FD /c
# ADD BASE MTL /nologo /D "NDEBUG" /mktyplib203 /win32
# ADD MTL /nologo /D "NDEBUG" /mktyplib203 /win32
# ADD BASE RSC /l 0x409 /d "NDEBUG"
# ADD RSC /l 0x409 /d "NDEBUG"
BSC32=bscmake.exe
# ADD BASE BSC32 /nologo
# ADD BSC32 /nologo
LINK32=link.exe
# ADD BASE LINK32 kernel32.lib user32.lib gdi32.lib winspool.lib comdlg32.lib advapi32.lib shell32.lib ole32.lib oleaut32.lib uuid.lib odbc32.lib odbccp32.lib /nologo /subsystem:windows /machine:I386
# ADD LINK32 kernel32.lib user32.lib gdi32.lib winspool.lib comdlg32.lib advapi32.lib shell32.lib ole32.lib oleaut32.lib uuid.lib odbc32.lib odbccp32.lib dxguid.lib ddraw.lib dinput.lib winmm.lib bass.lib /nologo /subsystem:windows /pdb:"..\bin\Release/demo2.pdb" /debug /machine:I386 /out:"..\bin\Release/demo2.exe" /libpath:"..\libs\release"
# SUBTRACT LINK32 /pdb:none

!ELSEIF  "$(CFG)" == "demo2 - Win32 Debug"

# PROP BASE Use_MFC 0
# PROP BASE Use_Debug_Libraries 1
# PROP BASE Output_Dir "Debug"
# PROP BASE Intermediate_Dir "Debug"
# PROP BASE Target_Dir ""
# PROP Use_MFC 0
# PROP Use_Debug_Libraries 1
# PROP Output_Dir "Debug"
# PROP Intermediate_Dir "Debug"
# PROP Target_Dir ""
# ADD BASE CPP /nologo /W3 /Gm /GX /ZI /Od /D "WIN32" /D "_DEBUG" /D "_WINDOWS" /D "_MBCS" /YX /FD /GZ /c
# ADD CPP /nologo /G6 /Gr /W3 /Gm /GX /ZI /Od /I "..\gamesystem\includes" /D "WIN32" /D "_DEBUG" /D "_WINDOWS" /D "_MBCS" /YX /FD /GZ /c
# SUBTRACT CPP /Fr
# ADD BASE MTL /nologo /D "_DEBUG" /mktyplib203 /win32
# ADD MTL /nologo /D "_DEBUG" /mktyplib203 /win32
# ADD BASE RSC /l 0x409 /d "_DEBUG"
# ADD RSC /l 0x409 /d "_DEBUG"
BSC32=bscmake.exe
# ADD BASE BSC32 /nologo
# ADD BSC32 /nologo
LINK32=link.exe
# ADD BASE LINK32 kernel32.lib user32.lib gdi32.lib winspool.lib comdlg32.lib advapi32.lib shell32.lib ole32.lib oleaut32.lib uuid.lib odbc32.lib odbccp32.lib /nologo /subsystem:windows /debug /machine:I386 /pdbtype:sept
# ADD LINK32 kernel32.lib user32.lib gdi32.lib winspool.lib comdlg32.lib advapi32.lib shell32.lib ole32.lib oleaut32.lib uuid.lib odbc32.lib odbccp32.lib dxguid.lib ddraw.lib dinput.lib winmm.lib bass.lib /nologo /subsystem:windows /pdb:"..\bin\Debug/demo2.pdb" /debug /machine:I386 /out:"..\bin\Debug/demo2.exe" /pdbtype:sept /libpath:"..\libs\debug"
# SUBTRACT LINK32 /pdb:none

!ENDIF 

# Begin Target

# Name "demo2 - Win32 Release"
# Name "demo2 - Win32 Debug"
# Begin Group "Source Files"

# PROP Default_Filter "cpp;c;cxx;rc;def;r;odl;idl;hpj;bat"
# Begin Source File

SOURCE=.\actor.cpp
# End Source File
# Begin Source File

SOURCE=.\actorinfo.cpp
# End Source File
# Begin Source File

SOURCE=.\bullet.cpp
# End Source File
# Begin Source File

SOURCE=.\demo2.cpp
# End Source File
# Begin Source File

SOURCE=.\engine.cpp
# End Source File
# Begin Source File

SOURCE=.\gamestate.cpp
# End Source File
# Begin Source File

SOURCE=.\missile.cpp
# End Source File
# Begin Source File

SOURCE=.\missileweapon.cpp
# End Source File
# Begin Source File

SOURCE=.\playgamestate.cpp
# End Source File
# Begin Source File

SOURCE=.\retroengine.cpp
# End Source File
# Begin Source File

SOURCE=.\scene.cpp
# End Source File
# Begin Source File

SOURCE=.\ship.cpp
# End Source File
# Begin Source File

SOURCE=.\shipengine.cpp
# End Source File
# Begin Source File

SOURCE=.\weapon.cpp
# End Source File
# End Group
# Begin Group "Header Files"

# PROP Default_Filter "h;hpp;hxx;hm;inl"
# Begin Source File

SOURCE=.\actor.h
# End Source File
# Begin Source File

SOURCE=.\actorinfo.h
# End Source File
# Begin Source File

SOURCE=.\bullet.h
# End Source File
# Begin Source File

SOURCE=.\demo2.h
# End Source File
# Begin Source File

SOURCE=.\engine.h
# End Source File
# Begin Source File

SOURCE=.\gamestate.h
# End Source File
# Begin Source File

SOURCE=.\missile.h
# End Source File
# Begin Source File

SOURCE=.\missileweapon.h
# End Source File
# Begin Source File

SOURCE=.\playgamestate.h
# End Source File
# Begin Source File

SOURCE=.\retroengine.h
# End Source File
# Begin Source File

SOURCE=.\scene.h
# End Source File
# Begin Source File

SOURCE=.\ship.h
# End Source File
# Begin Source File

SOURCE=.\shipengine.h
# End Source File
# Begin Source File

SOURCE=.\weapon.h
# End Source File
# End Group
# Begin Group "Resource Files"

# PROP Default_Filter "ico;cur;bmp;dlg;rc2;rct;bin;rgs;gif;jpg;jpeg;jpe"
# End Group
# End Target
# End Project
