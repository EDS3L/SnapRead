package com.snapread.dev.ocr.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.processing.Processor;
import java.io.*;
import java.nio.charset.StandardCharsets;

@Service
public class PythonService {

    @Value("${script.path}")
    private String scriptPath;

    private File tempFile;

    public String doOcr(MultipartFile file, String promptPath) throws IOException {
        tempFile = null;
        try {
            tempFile = File.createTempFile("upload-", "-" + file.getOriginalFilename());
            file.transferTo(tempFile);

            Process process = runPython(tempFile, promptPath).start();

            StringBuilder output = new StringBuilder();
            reader(process, output);

            return output.toString();
        } catch (IOException e) {
            throw e;
        }
    }


    //Reads data from file
    private void reader(Process process, StringBuilder output) throws IOException {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
        } catch (IOException e) {
            throw new IOException("Failed reader");
        }
    }


    private ProcessBuilder runPython(File tempFile, String promptPath) {
        ProcessBuilder pb = new ProcessBuilder("python", scriptPath, tempFile.getAbsolutePath(),promptPath);
        pb.redirectErrorStream(true);
        pb.environment().put("PYTHONIOENCODING", "utf-8");

        return pb;
    }


    public File getTempFile() {
        return tempFile;
    }
}