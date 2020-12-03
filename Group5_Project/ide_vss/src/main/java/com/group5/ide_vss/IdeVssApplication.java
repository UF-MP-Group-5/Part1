package com.group5.ide_vss;

import com.group5.ide_vss.utils.UtilDirectory;
import com.group5.ide_vss.utils.UtilPi;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class IdeVssApplication {

    public static void main(String[] args) throws IOException {
        //Get metadata from pi
        UtilPi.getTweetsFromPi();
        //Get current apps
        UtilDirectory.scan();
//
        SpringApplication.run(IdeVssApplication.class, args);
    }
}
