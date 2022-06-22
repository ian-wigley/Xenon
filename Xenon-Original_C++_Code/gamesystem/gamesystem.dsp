# Microsoft Developer Studio Project File - Name="gamesystem" - Package Owner=<4>
# Microsoft Developer Studio Generated Build File, Format Version 6.00
# ** DO NOT EDIT **

# TARGTYPE "Win32 (x86) Static Library" 0x0104

CFG=gamesystem - Win32 Debug
!MESSAGE This is not a valid makefile. To build this project using NMAKE,
!MESSAGE use the Export Makefile command and run
!MESSAGE 
!MESSAGE NMAKE /f "gamesystem.mak".
!MESSAGE 
!MESSAGE You can specify a configuration when running NMAKE
!MESSAGE by defining the macro CFG on the command line. For example:
!MESSAGE 
!MESSAGE NMAKE /f "gamesystem.mak" CFG="gamesystem - Win32 Debug"
!MESSAGE 
!MESSAGE Possible choices for configuration are:
!MESSAGE 
!MESSAGE "gamesystem - Win32 Release" (based on "Win32 (x86) Static Library")
!MESSAGE "gamesystem - Win32 Debug" (based on "Win32 (x86) Static Library")
!MESSAGE "gamesystem - Win32 TrueTime" (based on "Win32 (x86) Static Library")
!MESSAGE 

# Begin Project
# PROP AllowPerConfigDependencies 0
# PROP Scc_ProjName ""
# PROP Scc_LocalPath ""
CPP=cl.exe
RSC=rc.exe

!IF  "$(CFG)" == "gamesystem - Win32 Release"

# PROP BASE Use_MFC 0
# PROP BASE Use_Debug_Libraries 0
# PROP BASE Output_Dir "Release"
# PROP BASE Intermediate_Dir "Release"
# PROP BASE Target_Dir ""
# PROP Use_MFC 0
# PROP Use_Debug_Libraries 0
# PROP Output_Dir "Release"
# PROP Intermediate_Dir "Release"
# PROP Target_Dir ""
# ADD BASE CPP /nologo /W3 /GX /O2 /D "WIN32" /D "NDEBUG" /D "_MBCS" /D "_LIB" /YX /FD /c
# ADD CPP /nologo /G6 /Gr /W3 /GX /Zi /O2 /Ob2 /I ".\includes" /D "WIN32" /D "NDEBUG" /D "_MBCS" /D "_LIB" /Yu"gamesystem.h" /FD /c
# ADD BASE RSC /l 0x809 /d "NDEBUG"
# ADD RSC /l 0x809 /d "NDEBUG"
BSC32=bscmake.exe
# ADD BASE BSC32 /nologo
# ADD BSC32 /nologo
LIB32=link.exe -lib
# ADD BASE LIB32 /nologo
# ADD LIB32 /nologo /out:"..\libs\Release\gamesystem.lib"

!ELSEIF  "$(CFG)" == "gamesystem - Win32 Debug"

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
# ADD BASE CPP /nologo /W3 /Gm /GX /ZI /Od /D "WIN32" /D "_DEBUG" /D "_MBCS" /D "_LIB" /YX /FD /GZ /c
# ADD CPP /nologo /G6 /Gr /W3 /Gm /GX /ZI /Od /I ".\includes" /D "WIN32" /D "_DEBUG" /D "_MBCS" /D "_LIB" /FR /Yu"gamesystem.h" /FD /GZ /c
# ADD BASE RSC /l 0x809 /d "_DEBUG"
# ADD RSC /l 0x809 /d "_DEBUG"
BSC32=bscmake.exe
# ADD BASE BSC32 /nologo
# ADD BSC32 /nologo
LIB32=link.exe -lib
# ADD BASE LIB32 /nologo
# ADD LIB32 /nologo /out:"..\libs\Debug\gamesystem.lib"

!ELSEIF  "$(CFG)" == "gamesystem - Win32 TrueTime"

# PROP BASE Use_MFC 0
# PROP BASE Use_Debug_Libraries 0
# PROP BASE Output_Dir "gamesystem___Win32_TrueTime"
# PROP BASE Intermediate_Dir "gamesystem___Win32_TrueTime"
# PROP BASE Target_Dir ""
# PROP Use_MFC 0
# PROP Use_Debug_Libraries 0
# PROP Output_Dir "gamesystem___Win32_TrueTime"
# PROP Intermediate_Dir "gamesystem___Win32_TrueTime"
# PROP Target_Dir ""
# ADD BASE CPP /nologo /G6 /Gr /W3 /GX /Zi /O2 /Ob2 /I ".\includes" /D "WIN32" /D "NDEBUG" /D "_MBCS" /D "_LIB" /Yu"gamesystem.h" /FD /c
# ADD CPP /nologo /G6 /Gr /W3 /GX /Zi /O2 /Ob2 /I ".\includes" /D "WIN32" /D "NDEBUG" /D "_MBCS" /D "_LIB" /Yu"gamesystem.h" /FD /c
# ADD BASE RSC /l 0x809 /d "NDEBUG"
# ADD RSC /l 0x809 /d "NDEBUG"
BSC32=bscmake.exe
# ADD BASE BSC32 /nologo
# ADD BSC32 /nologo
LIB32=link.exe -lib
# ADD BASE LIB32 /nologo /out:"..\libs\Release\gamesystem.lib"
# ADD LIB32 /nologo /out:"..\libs\Release\gamesystem.lib"

!ENDIF 

# Begin Target

# Name "gamesystem - Win32 Release"
# Name "gamesystem - Win32 Debug"
# Name "gamesystem - Win32 TrueTime"
# Begin Group "Source Files"

# PROP Default_Filter "cpp;c;cxx;rc;def;r;odl;idl;hpj;bat"
# Begin Source File

SOURCE=.\source\gamesystem.cpp
# ADD CPP /Yc"gamesystem.h"
# End Source File
# Begin Source File

SOURCE=.\source\gs_application.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_collisionlist.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_colour.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_error.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_file.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_font.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_framecounter.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_image.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_inifile.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_input.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_joystick.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_keyboard.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_map.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_maptile.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_menu.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_menuitem.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_mouse.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_music.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_object.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_point.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_random.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_rect.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_sample.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_scoretable.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_screen.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_soundsystem.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_sprite.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_starfield.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_tiledimage.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_timer.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_vector.cpp
# End Source File
# Begin Source File

SOURCE=.\source\gs_visual.cpp
# End Source File
# End Group
# Begin Group "Header Files"

# PROP Default_Filter "h;hpp;hxx;hm;inl"
# Begin Source File

SOURCE=.\includes\gamesystem.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_application.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_collisionlist.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_colour.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_error.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_file.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_font.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_framecounter.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_image.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_inifile.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_input.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_joystick.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_keyboard.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_keycodes.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_list.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_map.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_maptile.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_maths.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_menu.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_menuitem.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_mouse.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_music.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_object.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_point.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_random.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_rect.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_sample.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_scoretable.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_screen.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_soundsystem.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_sprite.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_starfield.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_tiledimage.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_timer.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_types.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_vector.h
# End Source File
# Begin Source File

SOURCE=.\includes\gs_visual.h
# End Source File
# End Group
# End Target
# End Project
