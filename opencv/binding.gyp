{
    "targets": [
        {
            "target_name": "cv",
            "sources": [
                "src/opencv.cc"],
            "include_dirs": [
                "<!(node -e \"require('nan')\")",
                '-L<!(pwd)/include'
            ],
            'libraries': [
                '-L<!(pwd)/lib',
                '-lopencv_core -lopencv_highgui -lopencv_imgproc',
                '-lm -lstdc++'
            ],
            'cflags_cc': [
                '-std=c++11',
                '-fexceptions',
                '-Wno-ignored-qualifiers'
            ],
            'ldflags': [
                '-Wl,-rpath,\$$ORIGIN/../lib'
            ]
        }
    ],
}
