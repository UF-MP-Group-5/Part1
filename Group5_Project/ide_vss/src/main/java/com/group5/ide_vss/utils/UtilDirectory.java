package com.group5.ide_vss.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.group5.ide_vss.data.dataServices;
import com.group5.ide_vss.object.App;

import java.io.*;
import java.nio.file.Files;

public class UtilDirectory {
    public static String workingDirectory = "currentApps";

    public static ObjectMapper mapper = new ObjectMapper();

    public static void scan() throws IOException {
        File dir = new File(workingDirectory);
        File[] files = dir.listFiles();
        for (File file : files) {
            if (file.getName().endsWith(".json")) {
                BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
                App cur = new App(br.readLine());
                System.out.println(cur);
                dataServices.apps.put(cur.getAppName(), cur);
            }
        }
    }


    public static boolean setWorkingDirectory(String path) {
        //
        File file = new File(path);
        if (file.exists()) {
            workingDirectory = path;
            System.out.println("exist");
            return true;
        }

        if (file.mkdir()) {
            workingDirectory = path;
            System.out.println("created");
            return true;
        }

        System.out.println("failed");
        return false;
    }
}


