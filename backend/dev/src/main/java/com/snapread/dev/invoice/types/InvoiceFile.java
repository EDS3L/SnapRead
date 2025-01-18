package com.snapread.dev.invoice.types;

import java.io.File;
import java.io.IOException;

public record InvoiceFile(File file) {

    static String[] supportedExtensions = {".jpg", ".png", ".pdf", ".jpeg", ".tiff"};


    public static boolean validate(File file) throws IOException {
        if(file == null) {
            throw new IllegalArgumentException("File cannot be null");
        }

        if(file.length() == 0 ) {
            throw new IllegalArgumentException("File cannot be empty");
        }

        if(file.length() > 20000000) {
            throw new IllegalArgumentException("File size exceeds 20MB");
        }

        if(!isSupported(getFileExtension(file))) {
            throw new IllegalArgumentException("Invalid file format. Supported file formats are: " + String.join(", ", supportedExtensions));
        }
        return true;
    }

    private static String getFileExtension(File file) {
        String name = file.getName();
        int lastIndexOf = name.lastIndexOf(".");
        return name.substring(lastIndexOf);
    }

    private static Boolean isSupported(String extension) {
        for (String supportedExtension : supportedExtensions) {
            if (extension.equals(supportedExtension)) {
                return true;
            }
        }
        return false;
    }


}
