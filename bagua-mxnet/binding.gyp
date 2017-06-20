{
    "targets": [
        {
            "target_name": "mxnet",
            "sources": [
                "src/mx.cc",
                "src/mx_prd.cc"],
            "include_dirs": [
                "<!(node -e \"require('nan')\")",
                '-L<!(pwd)/include',
                '<!(pwd)',
            ],
            'libraries': [
                '-L<!(pwd)/lib',
                '-lmxnet-lnx64',
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
