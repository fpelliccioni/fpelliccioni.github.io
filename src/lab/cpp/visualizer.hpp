#pragma once

namespace lab {
extern "C" {
[[clang::import_name("checkpoint")]] void checkpoint(int line);
[[clang::import_name("sequence")]] void sequence(const int* data, int size);
[[clang::import_name("compare")]] void compare();
[[clang::import_name("read")]] void read();
[[clang::import_name("advance")]] void advance();
[[clang::import_name("predicate")]] void predicate(int value, bool result);
[[clang::import_name("output")]] void output(int index);
}

inline void step(int line = __builtin_LINE()) {
    checkpoint(line);
}

struct Iterator {
    const int* position;

    bool operator!=(Iterator other) const {
        compare();
        return position != other.position;
    }

    int operator*() const {
        read();
        return *position;
    }

    Iterator& operator++() {
        advance();
        ++position;
        return *this;
    }
};
}
